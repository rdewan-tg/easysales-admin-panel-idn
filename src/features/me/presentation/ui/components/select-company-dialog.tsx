import { useUserStore } from "@/features/user/presentation";
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useEffect } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import { blue } from "@mui/material/colors";

export interface CompanyDialogProps {
  open: boolean;
  onClose: () => void;
  onSelected: (value: number) => void;
}

const SelectCompanyDialog = (props: CompanyDialogProps) => {
  const { onSelected, onClose, open } = props;

  // companies
  const companies = useUserStore((state) => state.companies);
  const getCompanies = useUserStore.use.getCompanies();

  useEffect(() => {
    async function fetchCompanies() {
      getCompanies();
    }

    fetchCompanies();
  }, []);

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: number) => {
    onClose();
    onSelected(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Select Company</DialogTitle>
      <List sx={{ pt: 0 }}>
        {companies.map((company) => (
          <ListItem disablePadding key={company.id}>
            <ListItemButton onClick={() => handleListItemClick(company.id)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <BusinessIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={company.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default SelectCompanyDialog;
